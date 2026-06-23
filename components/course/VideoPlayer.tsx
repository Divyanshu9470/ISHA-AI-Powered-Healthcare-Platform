import { Play, Maximize2, Volume2, Settings } from "lucide-react";

interface VideoPlayerProps {
    videoUrl?: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
    return (
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group">
            {/* Placeholder Image/Gradient or Video Element */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                {videoUrl ? (
                    <div className="text-white text-center">
                        <Play className="w-20 h-20 opacity-80 group-hover:scale-110 transition-transform duration-300 cursor-pointer mx-auto" />
                        <p className="mt-4 text-sm opacity-60">Video: {videoUrl}</p>
                    </div>
                ) : (
                    <div className="text-white text-center">
                        <Play className="w-20 h-20 opacity-40 mx-auto" />
                        <p className="mt-4 text-sm opacity-40">No video selected</p>
                    </div>
                )}
            </div>

            {/* Custom Controls Overlay (Mockup) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer overflow-hidden">
                    <div className="h-full w-1/3 bg-primary" />
                </div>

                <div className="flex justify-between items-center text-white">
                    <div className="flex items-center gap-4">
                        <Play className="w-5 h-5 cursor-pointer fill-white" />
                        <Volume2 className="w-5 h-5 cursor-pointer" />
                        <span className="text-sm font-medium">00:00 / 00:00</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Settings className="w-5 h-5 cursor-pointer" />
                        <Maximize2 className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}

